import { cloneElement } from "react";
export default ({ children, renderer = <div /> }) => {
  // return (
  //   <>
  //     <div className="container">{children}</div>
  //     <style jsx>{`
  //       @import "../static/Container.css";
  //     `}</style>
  //   </>
  // )
  const style = {
    width: '100%',
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 20,
    paddingRight: 20,
  }

  const newElement = cloneElement(renderer, {
    style: Object.assign({}, renderer.props.style, style),
    children,
  });
  return newElement;
};
