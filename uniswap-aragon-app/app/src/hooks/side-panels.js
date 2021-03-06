import React, {useState} from 'react'
import {useCallback} from 'react'

export function useSidePanel() {

    const defaultSidePanel = {id: "", title: ""}

    const [currentSidePanel, setCurrentSidePanel] = useState(defaultSidePanel)
    const [visible, setVisible] = useState(false)
    const [opened, setOpened] = useState(false)

    const sidePanels = {
        DEFAULT: defaultSidePanel,
        SWAP: {
            id: 'SWAP',
            title: 'Swap Ether and Tokens'
        },
        TRANSFER: {
            id: 'TRANSFER',
            title: 'New Agent Transfer'
        },
        CHANGE_AGENT: {
            id: 'CHANGE_AGENT',
            title: 'Change the Agent'
        },
        CHANGE_UNISWAP_FACTORY: {
            id: 'CHANGE_UNISWAP_FACTORY',
            title: 'Change the Uniswap Factory'
        }
    }

    const requestOpen = useCallback((sidePanel) => {
        setCurrentSidePanel(sidePanel)
        setVisible(true)
    }, [setVisible, currentSidePanel])

    const endTransition = useCallback(
        opened => {
            if (opened) {
                setOpened(true)
            } else {
                setOpened(false)
                setCurrentSidePanel(sidePanels.DEFAULT)
            }
        },
        [setOpened, currentSidePanel]
    )

    const requestClose = useCallback(() => {
        setVisible(false)
    }, [setVisible])

    const openPanelActions = {
        swap: () => requestOpen(sidePanels.SWAP),
        transfer: () => requestOpen(sidePanels.TRANSFER),
        changeAgent: () => requestOpen(sidePanels.CHANGE_AGENT),
        changeUniswapFactory: () => requestOpen(sidePanels.CHANGE_UNISWAP_FACTORY)
    }

    return { currentSidePanel, opened, visible, openPanelActions, requestOpen, endTransition, requestClose }
}

