/** Чтение файла в data URL для сохранения в localStorage (админ-деплой без облака). */
export type ReadUploadResult =
  | { ok: true; dataUrl: string }
  | { ok: false; error: string };

const MB = 1024 * 1024;

export async function readUploadAsDataUrl(
  file: File,
  opts: { maxBytes: number; kind: "image" | "video" },
): Promise<ReadUploadResult> {
  if (file.size > opts.maxBytes) {
    const lim = (opts.maxBytes / MB).toFixed(0);
    return { ok: false, error: `Файл слишком большой (макс. ${lim} МБ для этого поля).` };
  }
  if (opts.kind === "image" && !file.type.startsWith("image/")) {
    return { ok: false, error: "Выберите файл изображения (JPEG, PNG, WebP…)." };
  }
  if (opts.kind === "video" && !file.type.startsWith("video/")) {
    return { ok: false, error: "Выберите видеофайл (MP4, WebM…)." };
  }

  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const r = reader.result;
      if (typeof r === "string") resolve({ ok: true, dataUrl: r });
      else resolve({ ok: false, error: "Не удалось прочитать файл." });
    };
    reader.onerror = () => resolve({ ok: false, error: "Ошибка чтения файла." });
    reader.readAsDataURL(file);
  });
}

export const MAX_IMAGE_BYTES = 6 * MB;
export const MAX_VIDEO_BYTES = 20 * MB;
