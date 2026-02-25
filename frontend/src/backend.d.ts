import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Credits {
    balance: bigint;
    isPro: boolean;
}
export interface PhotoRecord {
    id: PhotoId;
    blob: ExternalBlob;
    filename: string;
    uploadTime: Time;
}
export type Time = bigint;
export type PhotoId = string;
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    consumeCredit(): Promise<string>;
    deletePhoto(id: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCreditStatus(): Promise<Credits>;
    getPhoto(id: string): Promise<PhotoRecord | null>;
    getPhotoBlob(id: string): Promise<ExternalBlob>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listPhotos(): Promise<Array<PhotoRecord>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    upgradeToPro(): Promise<string>;
    uploadPhoto(name: string, blob: ExternalBlob): Promise<string>;
}
