import { useCallback, useState } from "react";
import {
  Button,
  Layout,
  Icon,
  Input,
  Avatar,
  Tooltip,
  Dropdown,
  Menu,
} from "antd";
import getConfig from "next/config";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "next/router";

import Container from "./Container";
import { logOut } from "../store/store";

const { publicRuntimeConfig } = getConfig();
const { Header, Content, Footer } = Layout;

function LayoutCon({ children, user, logOut, router }) {
  console.log("arg---", arguments);

  const [search, setSearch] = useState("");

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);
  // onSearch敲回车
  const github_icon_style = {
    color: "white",
    fontSize: 40,
    display: "block",
    paddingTop: 10,
    marginRight: 20,
  };
  const handleOnSearch = useCallback((e) => {}, []);
  const handleLogout = useCallback(() => {
    logOut();
  }, [logOut]);

  const handleGoOAuth = useCallback((e) => {
    e.preventDefault();
    axios.get(`/prepare-auth?url=${router.asPath}`).then((res) => {
      if (res.status === 200) {
        location.href = publicRuntimeConfig.OAUTH_URL
      } else {
        console.log("prepare auth failed", res)
      }
    })
    .catch(err=>{
      console.log("prepare auth failed", err)

    })
  }, [])

  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a href="javascript:void(0)" onClick={handleLogout}>
          登出
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header className="header">
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Icon type="github" style={github_icon_style}></Icon>
            </div>
            <div>
              <Input.Search
                placeholder="srech"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              />
            </div>
          </div>

          <div className="header-right">
            <div className="user">
              {user && user.id ? (
                <Dropdown overlay={userDropDown}>
                  <a href="/">
                    <Avatar size={40} src={user.avatar_url} />
                  </a>
                </Dropdown>
              ) : (
                <Tooltip title="点击进行登录">
                  <a
                    href={`/prepare-auth?url=${router.asPath}`}
                    // onClick={handleGoOAuth}
                  >
                    <Avatar size={40} icon="user" />
                  </a>
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container>{children}</Container>

        <div className="btn">lalla</div>
      </Content>

      <Footer className="footer">
        Develop by Wq @<a href="mailto:741644017@qq.com">my mail</a>
      </Footer>
      {/* @import'../static/a.css'; */}

      <style jsx>{`
        @import "../static/Layout.css";
      `}</style>
      <style jsx global>{`
        #__next,
        .ant-layout {
          height: 100%;
        }
      `}</style>
    </Layout>
  );
}

function mapState(state) {
  return {
    user: state.user,
  };
}
function mapReducer(dispatch) {
  return {
    logOut: () => dispatch(logOut()),
  };
}
export default connect(mapState, mapReducer)(withRouter(LayoutCon));
