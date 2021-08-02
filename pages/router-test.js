import { Button } from "antd";
import { Fragment } from "react";
import Link from "next/link";
import useRouter, { Router } from "next/router";

const handleEvents = [
  'routeChangeStart',
  'routeChangeComplete',
  'routeChangeError',
  'beforeHistoryChange',
  'hashChangeStart',
  'hashChangeComplete'
]
function makeEvent(type) {
  return (...args) => {
    console.log('类型：', type, '参数：', ...args)
  }
}
handleEvents.forEach(e => {
  Router.events.on(e, makeEvent(e))
})