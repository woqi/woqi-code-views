
import Link from "next/link"
import { Button, Layout } from "antd"

import { Fragment } from "react";

export default ({ children }) => {

  return (
    <Fragment>
      <header>
        <Link href="/">
          <Button>去index页面</Button>
        </Link>
        <Link href="/a">
          <Button>去a页面</Button>
        </Link>
        <Link href="/b">
          <Button>去b页面</Button>
        </Link>
      </header>
      {children}
      <aside>漂浮窗</aside>

    </Fragment>



  )
}