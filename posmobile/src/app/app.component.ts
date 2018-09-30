import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { EnumTabs } from '../enums/enumtabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;

  rootPage:any = TabsPage;
  
  menus: Array<{ title: string, component: any, system: boolean, tab: EnumTabs }>;

  constructor(platform: Platform, 
    public menu: MenuController,
    statusBar: StatusBar, 
    splashScreen: SplashScreen) {

    
    this.menus = [
      { title: 'Home', component: TabsPage, system: false, tab: EnumTabs.Home },
      { title: 'Contact', component: TabsPage, system: false,  tab: EnumTabs.Contact },
      { title: 'About', component: TabsPage, system: true,  tab: EnumTabs.About },
      { title: 'None Existing Page', component: AboutPage, system: true,  tab: EnumTabs.None }
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    if (page.tab != EnumTabs.None && this.nav.getActiveChildNav())
      this.nav.getActiveChildNav().select(page.tab);          
    else
      this.nav.setRoot(page.component, { tabIndex: page.tab });
  }

  filterMenu(menu: { title: string, component: any, system: boolean, tab: EnumTabs }, value: boolean) {
    return menu.system == value;
  }
}
