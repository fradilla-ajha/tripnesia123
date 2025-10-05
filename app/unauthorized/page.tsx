export default function UnauthorizedPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg text-center space-y-3">
        <h1 className="text-2xl font-semibold">Akses Ditolak</h1>
        <p className="text-muted-foreground">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
        <a
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-primary-foreground"
        >
          Kembali ke Beranda
        </a>
      </div>
    </main>
  )
}
