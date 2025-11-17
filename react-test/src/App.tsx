import { useState } from 'react'
import {
  Button, Header, HeaderMenuButton, HeaderName, HeaderNavigation, HeaderMenuItem, HeaderMenu,
  HeaderGlobalBar, HeaderGlobalAction, SkipToContent, SideNav,
  SideNavItems, HeaderSideNavItems, SideNavMenu, SideNavMenuItem, SideNavLink
} from '@carbon/react';
import { Notification, Fade, Search, Switcher } from '@carbon/icons-react';
import './App.css'


function onClickSideNavExpand() {

}

function action(actionName: string): () => void {
  console.log(actionName);
  return () => {};
}

function App() {
  const [count, setCount] = useState(0)

  const isSideNavExpanded = true;
  

  return (
    <>
      <Header>
        <SkipToContent />
        <HeaderMenuButton aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'} onClick={onClickSideNavExpand} isActive={isSideNavExpanded} aria-expanded={isSideNavExpanded} />
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <HeaderNavigation aria-label="IBM [Platform]">
            <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
            <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
              <HeaderMenuItem href="#one">Sub-link 1</HeaderMenuItem>
              <HeaderMenuItem href="#two">Sub-link 2</HeaderMenuItem>
              <HeaderMenuItem href="#three">Sub-link 3</HeaderMenuItem>
            </HeaderMenu>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Search" onClick={action('search click')} tooltipAlignment="start">
              <Search size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Notifications" onClick={action('notification click')}>
              <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="App Switcher" onClick={action('app-switcher click')} tooltipAlignment="end">
              <Switcher size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <SideNav aria-label="Side navigation" expanded={isSideNavExpanded} onSideNavBlur={onClickSideNavExpand} href="#main-content">
            <SideNavItems>
              <HeaderSideNavItems hasDivider={true}>
                <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                  <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                  <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                  <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                </HeaderMenu>
              </HeaderSideNavItems>
              <SideNavMenu renderIcon={Fade} title="Category title" tabIndex={0}>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 5
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 6
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 7
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Fade} title="Category title" tabIndex={0}>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 8
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 9
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 10
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Fade} title="Category title" isActive={true} tabIndex={0}>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 11
                </SideNavMenuItem>
                <SideNavMenuItem aria-current="page" href="https://www.carbondesignsystem.com/">
                  Link 12
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 13
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavLink renderIcon={Fade} href="https://www.carbondesignsystem.com/">
                Link
              </SideNavLink>
              <SideNavLink renderIcon={Fade} href="https://www.carbondesignsystem.com/">
                Link
              </SideNavLink>
            </SideNavItems>
          </SideNav>
      </Header>
      <div>
        <Button onClick={() => alert('Hello from Carbon Button!')}>Carbon Button</Button>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
