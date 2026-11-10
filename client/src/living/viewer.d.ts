export interface LivingViewer {
  /** Open the living painting for an artwork id (the `i` in artworks.json). */
  open(artId: number): void;
  close(): void;
  isOpen(): boolean;
}
export function createLivingViewer(opts?: { onOpen?: () => void; onClose?: () => void }): LivingViewer;
