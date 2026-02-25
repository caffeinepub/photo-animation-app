import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob, type PhotoRecord, type Credits } from '../backend';

export function useListPhotos() {
  const { actor, isFetching } = useActor();

  return useQuery<PhotoRecord[]>({
    queryKey: ['photos'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPhotos();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPhoto(id: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery<PhotoRecord | null>({
    queryKey: ['photo', id],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getPhoto(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useUploadPhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, data }: { name: string; data: ArrayBuffer }) => {
      if (!actor) throw new Error('Actor not initialized');
      const blob = ExternalBlob.fromBytes(new Uint8Array(data as ArrayBuffer));
      const id = await actor.uploadPhoto(name, blob);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
    },
  });
}

export function useDeletePhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deletePhoto(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
    },
  });
}

export function useGetCreditStatus() {
  const { actor, isFetching } = useActor();

  return useQuery<Credits>({
    queryKey: ['creditStatus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCreditStatus();
    },
    enabled: !!actor && !isFetching,
    staleTime: 10_000,
  });
}

export function useConsumeCredit() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.consumeCredit();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creditStatus'] });
    },
  });
}

export function useUpgradeToPro() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.upgradeToPro();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creditStatus'] });
    },
  });
}
