
import { Fragment } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
// import Comp from "../components/Comp";


export default withRouter(
  ({ router }) => {
    return (
      <Fragment>
        页面cccc
        <Link href="#ccccdddd">
          <a>组件{router.query.id}</a>
        </Link>
      </Fragment>
    )
  }
)

