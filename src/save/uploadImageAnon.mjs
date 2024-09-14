import fs from 'fs'

/**
 * Uploads an image anonymously to Imgur.
 *
 * This function reads an image file from the local filesystem, converts it to Base64,
 * and uploads it to Imgur using the anonymous API. The Imgur `Client-ID` is required for
 * authorization.
 *
 * @param {string} clientId - The Client ID for Imgur, used for anonymous API requests.
 * @param {string} imagenPath - The local file path to the image to upload.
 * @returns {Promise<Object|null>} - A promise that resolves to the response data from Imgur on success, or `null` on failure.
 *
 * @example
 * const clientId = 'your-client-id';
 * const imagePath = './path/to/image.jpg';
 *
 * uploadImageAnon(clientId, imagePath)
 *   .then(data => {
 *     if (data) {
 *       console.log('Image uploaded successfully:', data.link);
 *     } else {
 *       console.log('Failed to upload the image.');
 *     }
 *   })
 *   .catch(error => console.error('Error:', error));
 */
export async function uploadImageAnon(clientId, imagenPath) {
  const imageBase64 = fs.readFileSync(imagenPath, 'base64')
  const url = 'https://api.imgur.com/3/image'
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${clientId}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: imageBase64,
        type: 'base64' // Especificamos que la imagen está en formato base64
      })
    })
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      console.log('Imagen subida exitosamente:', data.data.link)
      return data.data
    } else {
      console.error('Error al subir la imagen:', data)
      return null
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    return null
  }
}
