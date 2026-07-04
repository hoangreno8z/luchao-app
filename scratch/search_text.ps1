$path = "C:\Users\ADMIN\.gemini\antigravity\scratch\luchao_app\scratch\cuban_extracted.txt"
$lines = Get-Content -Path $path -Encoding UTF8
$output = New-Object System.Collections.Generic.List[string]

# Regex: 't.m t.nh' matches 'tâm tính' (using ASCII characters to avoid script encoding corruption)
$regex1 = "t.m\s+t.nh"
$regex2 = "t.m\s+th.i"

for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match $regex1 -or $lines[$i] -match $regex2) {
        $output.Add("========================================")
        $output.Add("LINE ${i}: $($lines[$i])")
        $output.Add("========================================")
        $start = [Math]::Max(0, $i - 5)
        $end = [Math]::Min($lines.Length - 1, $i + 15)
        for ($j = $start; $j -le $end; $j++) {
            if ($j -eq $i) {
                $output.Add("> $($lines[$j])")
            } else {
                $output.Add("  $($lines[$j])")
            }
        }
    }
}

[System.IO.File]::WriteAllLines("C:\Users\ADMIN\.gemini\antigravity\scratch\luchao_app\scratch\search_results.txt", $output, [System.Text.Encoding]::UTF8)
Write-Output "Done writing search results."
