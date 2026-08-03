$currentDir = "C:\Users\ADMIN\.gemini\antigravity\scratch\luchao_app"
$pdfFile = Get-ChildItem -Path $currentDir -Filter "*.pdf" | Where-Object { $_.Name -like "*384*" } | Select-Object -First 1

if (-not $pdfFile) {
    Write-Error "Không tìm thấy file PDF quẻ hào."
    exit
}

$pdfPath = $pdfFile.FullName
$docxPath = Join-Path $currentDir "scratch\Ý Nghĩa 64 Quẻ 384 Hào.docx"
$txtPath = Join-Path $currentDir "scratch\Ý Nghĩa 64 Quẻ 384 Hào_clean.txt"

# Thiết lập Registry để tắt hội thoại cảnh báo PDF Converter của MS Word
$regPath = "HKCU:\Software\Microsoft\Office\16.0\Word\Options"
if (Test-Path $regPath) {
    Write-Host "Cài đặt registry bypass hội thoại PDF Converter..."
    Set-ItemProperty -Path $regPath -Name "DidShowPDFConversation" -Value 1 -ErrorAction SilentlyContinue
}

Write-Host "Đang khởi động Word COM..."
try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0 # Tắt toàn bộ alert hộp thoại thông báo
    
    Write-Host "Đang mở PDF bằng Word..."
    $doc = $word.Documents.Open($pdfPath, $false, $true)
    
    Write-Host "Đang lưu dưới dạng Word .docx..."
    $doc.SaveAs2($docxPath, 16) # wdFormatXMLDocument = 16
    
    Write-Host "Đang lưu dưới dạng Text sạch..."
    $doc.SaveAs2($txtPath, 2) # wdFormatText = 2
    
    $doc.Close()
    $word.Quit()
    Write-Host "Đã chuyển đổi thành công hoàn hảo!"
} catch {
    Write-Error "Lỗi khi convert: $_"
    if ($word) { $word.Quit() }
}
