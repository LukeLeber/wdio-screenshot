import sizeOf from 'image-size';

export default function getBase64ImageSize(base64Screenshot) {
  const buffer = Buffer.from(base64Screenshot, 'base64');
  const size = sizeOf(buffer);
  return size;
}
