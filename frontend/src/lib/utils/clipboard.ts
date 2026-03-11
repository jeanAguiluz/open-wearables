import { toast } from 'sonner';

/**
 * Copy text to clipboard with toast notifications.
 * @param text - The text to copy
 * @param successMessage - Optional custom success message (default: 'Copied to clipboard')
 * @returns Promise<boolean> - true if successful, false otherwise
 */
export async function copyToClipboard(
  text: string,
  successMessage = 'Copiado al portapapeles'
): Promise<boolean> {
  if (!navigator.clipboard) {
    toast.error('El portapapeles no es compatible');
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    toast.success(successMessage);
    return true;
  } catch {
    toast.error('No se pudo copiar al portapapeles');
    return false;
  }
}
