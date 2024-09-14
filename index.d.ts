// index.d.ts
declare module 'simple-imgur-api' {
  /**
   * Uploads an image anonymously to Imgur.
   *
   * This function reads an image file from the local filesystem, converts it to Base64,
   * and uploads it to Imgur using the anonymous API. The Imgur `Client-ID` is required for
   * authorization.
   *
   * @param clientId - The Client ID for Imgur, used for anonymous API requests.
   * @param imagenPath - The local file path to the image to upload.
   * @returns A promise that resolves to the response data from Imgur on success, or `null` on failure.
   */
  export async function uploadImageAnon(
    clientId: string,
    imagenPath: string,
  ): Promise<string | null>
}
