import { useState } from 'react'
import {
  Button, Header, HeaderMenuButton, HeaderName, HeaderNavigation, HeaderMenuItem, HeaderMenu,
  HeaderGlobalBar, HeaderGlobalAction, SkipToContent, SideNav,
  SideNavItems, SideNavMenu, SideNavMenuItem, SideNavLink
} from '@carbon/react';
import { Notification, Search, Switcher } from '@carbon/icons-react';
import './App.scss'


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
          <HeaderName style={{width: "18rem"}} href="#" prefix="IBM">
            Carbon React Test
          </HeaderName>
          <HeaderNavigation aria-label="IBM [Platform]">
            <HeaderMenuItem href="#file">File</HeaderMenuItem>
            <HeaderMenuItem href="#edit">Edit</HeaderMenuItem>
            <HeaderMenuItem href="#selection">Selection</HeaderMenuItem>
            <HeaderMenu aria-label='View' menuLinkName='View'>
              <HeaderMenuItem href="#everything">Everything</HeaderMenuItem>
              <HeaderMenuItem href="#hide-some-things">Hide some things</HeaderMenuItem>
              <HeaderMenuItem href="#hide-other-things">Hide other things</HeaderMenuItem>
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
                <SideNavLink href="#file">File</SideNavLink>
                <SideNavLink href="#edit">Edit</SideNavLink>
                <SideNavLink href="#view">Selection</SideNavLink>
                <SideNavMenu aria-label="View" title="View">
                  <SideNavMenuItem href="#everything">Everything</SideNavMenuItem>
                  <SideNavMenuItem href="#hide-some-things">Hide some things</SideNavMenuItem>
                  <SideNavMenuItem href="#hide-other-things">Hide other things</SideNavMenuItem>
                </SideNavMenu>
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
