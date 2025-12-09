export type ValidateOpenedTab = {
    tabs: Tabs[],
    tabName: string
}

export function getTab({ tabs, tabName }: ValidateOpenedTab): Tabs {
    const selectedTab: Tabs[] = tabs.filter(tab => {
        return tab.tabName.toLowerCase() == tabName.toLowerCase();
    })

    return selectedTab[0];
}