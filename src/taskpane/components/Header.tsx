import * as React from "react";
import { DefaultPalette, Stack, IStackStyles, IStackTokens, IStackItemStyles, IIconProps } from '@fluentui/react'
import { IButtonStyles, IconButton } from '@fluentui/react/lib/Button'
import { FontIcon } from '@fluentui/react/lib/Icon';
import { mergeStyles } from '@fluentui/react/lib/Styling';

export interface Props {
    openPanel
}

const Header = (props: Props) => {
    // Styles definition
    const stackStyles: IStackStyles = {
        root: {
            background: DefaultPalette.white,
        }
    }

    const stackItemStyles: IStackItemStyles = {
        root: {
            alignItems: 'left',
            background: DefaultPalette.white,
            color: DefaultPalette.themeDark,
            display: 'flex',
            justifyContent: 'left'
        }
    }

    // LogoIcons
    const iconClass = mergeStyles({
        fontSize: 24
    })

    // SettingsIconButton
    const settingsIcon: IIconProps = { iconName: 'Settings' }
    
    return (
        <Stack horizontal horizontalAlign="space-between" styles={stackStyles}>
            <Stack.Item styles={stackItemStyles}>
                <FontIcon aria-label="Logo" iconName="ColumnLeftTwoThirdsEdit" className={iconClass} />
            </Stack.Item>
            <Stack.Item styles={stackItemStyles}>
                <IconButton iconProps={settingsIcon} title="Settings" ariaLabel="Settings" onClick={props.openPanel} />
            </Stack.Item>
        </Stack>
    )
}

export default Header