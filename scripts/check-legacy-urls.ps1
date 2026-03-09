param(
    [string]$BaseUrl = "https://masaveutech.com"
)

$tests = @(
    @{ Path = "/"; Expected = 200 },
    @{ Path = "/index.html"; Expected = 301 },
    @{ Path = "/es/"; Expected = 200 },
    @{ Path = "/es/index.html"; Expected = 301 },
    @{ Path = "/sitemap.xml"; Expected = 200 },
    @{ Path = "/robots.txt"; Expected = 200 },
    @{ Path = "/en/nuestro-fundador/"; Expected = 301 },
    @{ Path = "/en/servicios-masaveu-tech/"; Expected = 301 },
    @{ Path = "/nuestro-fundador/"; Expected = 301 },
    @{ Path = "/contacto/"; Expected = 301 },
    @{ Path = "/wp-sitemap.xml"; Expected = 301 },
    @{ Path = "/sitemap_index.xml"; Expected = 301 },
    @{ Path = "/assets/index.html"; Expected = @(404, 410) },
    @{ Path = "/masaveutech.com.zip"; Expected = @(404, 410) }
)

$errors = 0

foreach ($test in $tests) {
    $url = "{0}{1}" -f $BaseUrl.TrimEnd("/"), $test.Path
    # We need the first response code, so do not follow redirects.
    $status = [int](& curl.exe -s -o NUL -w "%{http_code}" $url)
    $expectedValues = @($test.Expected | ForEach-Object { [int]$_ })
    if ($expectedValues -notcontains $status) {
        $expectedText = ($expectedValues -join ", ")
        Write-Host ("FAIL  {0} -> {1} (expected one of: {2})" -f $url, $status, $expectedText) -ForegroundColor Red
        $errors++
    } else {
        Write-Host ("PASS  {0} -> {1}" -f $url, $status) -ForegroundColor Green
    }
}

if ($errors -gt 0) {
    Write-Host ("`n{0} checks failed." -f $errors) -ForegroundColor Red
    exit 1
}

Write-Host "`nAll checks passed." -ForegroundColor Green
