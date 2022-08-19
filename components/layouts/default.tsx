type LayoutProp = {
  children: React.ReactNode
}
export default function Layout(prop: LayoutProp) {
  return (
    <>
       <main>{prop.children}</main>
    </>
  )
}