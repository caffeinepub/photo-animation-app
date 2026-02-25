import Time "mo:core/Time";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  type PhotoId = Text;

  type PhotoRecord = {
    id : PhotoId;
    filename : Text;
    uploadTime : Time.Time;
    blob : Storage.ExternalBlob;
  };

  type Credits = {
    balance : Nat;
    isPro : Bool;
  };

  type UserId = Principal;

  type UserProfile = {
    name : Text;
  };

  let defaultFreeCredits : Nat = 5;
  let proUnlimitedCredits : Nat = 9999999;

  let photosMap = Map.empty<Text, PhotoRecord>();
  let userCreditsMap = Map.empty<UserId, Credits>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile management

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Photo management

  public shared ({ caller }) func uploadPhoto(name : Text, blob : Storage.ExternalBlob) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload photos");
    };
    let id = name # Int.toText(Time.now());
    let photoRecord : PhotoRecord = {
      id;
      filename = name;
      uploadTime = Time.now();
      blob;
    };
    photosMap.add(id, photoRecord);
    id;
  };

  public shared ({ caller }) func deletePhoto(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete photos");
    };
    if (photosMap.containsKey(id)) {
      photosMap.remove(id);
      ();
    } else {
      Runtime.trap("Photo with id " # id # " does not exist. ");
    };
  };

  public query ({ caller }) func listPhotos() : async [PhotoRecord] {
    photosMap.values().toArray();
  };

  public query ({ caller }) func getPhoto(id : Text) : async ?PhotoRecord {
    photosMap.get(id);
  };

  public query ({ caller }) func getPhotoBlob(id : Text) : async Storage.ExternalBlob {
    switch (photosMap.get(id)) {
      case (null) { Runtime.trap("Photo with id " # id # " does not exist. ") };
      case (?record) { record.blob };
    };
  };

  // Credit system

  public shared ({ caller }) func consumeCredit() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can consume credits");
    };
    switch (userCreditsMap.get(caller)) {
      case (?credits) {
        if (credits.isPro) {
          "Pro users have unlimited credits!";
        } else if (credits.balance > 0) {
          let newCredits : Credits = {
            credits with balance = credits.balance - 1;
          };
          userCreditsMap.add(caller, newCredits);
          newCredits.balance.toText() # " credits left";
        } else {
          Runtime.trap("No credits left!");
        };
      };
      case (null) {
        let newCredits : Credits = {
          balance = defaultFreeCredits - 1;
          isPro = false;
        };
        userCreditsMap.add(caller, newCredits);
        newCredits.balance.toText() # " credits left";
      };
    };
  };

  public shared ({ caller }) func upgradeToPro() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upgrade to Pro");
    };
    let proCredits : Credits = {
      balance = proUnlimitedCredits;
      isPro = true;
    };
    userCreditsMap.add(caller, proCredits);
    "Congratulations! You are now a Pro user with unlimited credits!";
  };

  public query ({ caller }) func getCreditStatus() : async Credits {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view credit status");
    };
    switch (userCreditsMap.get(caller)) {
      case (?credits) { credits };
      case (null) {
        {
          balance = defaultFreeCredits;
          isPro = false;
        };
      };
    };
  };
};
