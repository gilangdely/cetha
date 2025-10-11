import ProfileDropdown from "./ProfileDropdown"

export default function Navbar() {
  return (
    <header className="w-full h-14 px-4 flex items-center justify-between border-b bg-white">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <ProfileDropdown />
    </header>
  )
}