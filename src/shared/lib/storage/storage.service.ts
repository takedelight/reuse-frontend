type Action = { url: string; key: string };

export class StorageService {
  async createItem(
    file: File,
    action: (file: File) => Promise<Action>,
    confirmAction: (key: string) => Promise<unknown>,
  ): Promise<void> {
    const { url, key } = await action(file);

    const s3Response = await fetch(url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    if (!s3Response.ok) throw new Error("errors.server.avatar_upload_failed");

    await confirmAction(key);
  }

  async deleteItem(action: () => Promise<void>): Promise<void> {
    await action();
  }
}

export const storageService = new StorageService();
