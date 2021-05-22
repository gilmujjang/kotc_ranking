import { useRouter } from "next/router"

const admin_main = () => {
  const router = useRouter()
  const { group } = router.query

  return (
    <>
      <h1>Admin page for</h1>
      <h2>{group}</h2>
    </>
  )
}

export default admin_main