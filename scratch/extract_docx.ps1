Add-Type -AssemblyName System.IO.Compression.FileSystem
$docxPath = "C:\Users\ADMIN\Desktop\New folder\Cuban.docx"
$outputPath = "C:\Users\ADMIN\.gemini\antigravity\scratch\luchao_app\scratch\cuban_extracted.txt"

if (-not (Test-Path $docxPath)) {
    Write-Host "File not found: $docxPath"
    Exit
}

$zip = [System.IO.Compression.ZipFile]::OpenRead($docxPath)
$entry = $zip.Entries | Where-Object { $_.FullName -eq "word/document.xml" }
if (-not $entry) {
    Write-Host "word/document.xml not found in docx"
    $zip.Dispose()
    Exit
}

$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xmlText = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

$xml = [xml]$xmlText
$ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")

$paragraphs = $xml.SelectNodes("//w:p", $ns)
$result = New-Object System.Collections.Generic.List[string]

foreach ($p in $paragraphs) {
    $runs = $p.SelectNodes(".//w:t", $ns)
    if ($runs) {
        $pText = ""
        foreach ($r in $runs) {
            $pText += $r.InnerText
        }
        if ($pText.Trim().Length -gt 0) {
            $result.Add($pText)
        }
    }
}

[System.IO.File]::WriteAllLines($outputPath, $result, [System.Text.Encoding]::UTF8)
Write-Host "Successfully extracted $($result.Count) lines to $outputPath"
