import { Spin } from "antd"
export default () => {
  return (
    <div className="root">
      <Spin />
      <style jsx>
        {`
          @import "../static/PageLoading.css";
        `}
      </style>
    </div>
  )
}
