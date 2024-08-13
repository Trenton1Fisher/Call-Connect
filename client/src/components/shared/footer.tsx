export default function Footer() {
  return (
    <footer className="bg-muted py-6 mt-12 text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:gap-0">
        <p className="text-xs">&copy; 2024 Acme Inc. All rights reserved.</p>
        <div className="flex items-center gap-4 text-xs">
          <p className="hover:underline cursor-pointer">Privacy Policy</p>
          <p className="hover:underline cursor-pointer">Terms of Service</p>
          <p className="hover:underline cursor-pointer">Feedback</p>
        </div>
      </div>
    </footer>
  )
}
