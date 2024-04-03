// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCroppedImg(srcImage: string, pixelCrop: { width: any; height: any; x: any; y: any; }) {
    let img = new Image();
    img.src = srcImage;
    const targetX = srcImage.width * pixelCrop.x / 100;
    const targetY = srcImage.height * pixelCrop.y / 100;
    const targetWidth = srcImage.width * pixelCrop.width / 100;
    const targetHeight = srcImage.height * pixelCrop.height / 100;
   
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
   
    ctx.drawImage(
       img,
       targetX,
       targetY,
       targetWidth,
       targetHeight,
       0,
       0,
       targetWidth,
       targetHeight
    );
   
    return canvas.toDataURL('image/jpeg');
   }
   