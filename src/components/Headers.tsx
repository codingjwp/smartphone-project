
type HeaderProps = {
  title: string;
}

const Headers = ({title}: HeaderProps) => {
  return (
  <header className="flex fixed top-0 left-0 justify-start w-full h-11 bg-cyan-600">
    <h1 className="flex items-center h-full pl-2 text-2xl font-bold text-fuchsia-50">{title}</h1>
  </header>
  )
}

export default Headers;