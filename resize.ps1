Add-Type -AssemblyName System.Drawing
$source = "d:\my-porfolio-\public\images\profile\payan-toga.jpeg"
$dest = "d:\my-porfolio-\public\images\profile\payan-toga-optimized.jpeg"

$image = [System.Drawing.Image]::FromFile($source)
$ratio = $image.Width / $image.Height
$newHeight = [int]600
$newWidth = [int][math]::Round($newHeight * $ratio)

$bitmap = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$graphics.DrawImage($image, 0, 0, $newWidth, $newHeight)
$bitmap.Save($dest, [System.Drawing.Imaging.ImageFormat]::Jpeg)

$image.Dispose()
$bitmap.Dispose()
$graphics.Dispose()
