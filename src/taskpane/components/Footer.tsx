import * as React from "react";
import { DefaultPalette, Stack, IStackStyles, IStackTokens, IStackItemStyles, IIconProps, TextField, IContextualMenuProps } from '@fluentui/react'
import { ActionButton, CommandButton, IButtonStyles, IconButton } from '@fluentui/react/lib/Button'
import { FontIcon } from '@fluentui/react/lib/Icon';
import { mergeStyles } from '@fluentui/react/lib/Styling';

export interface Props {
    language: string
    setLanguage: Function
}

const Footer = (props: Props) => {
    // Styles definition
    const stackStyles: IStackStyles = {
        root: {
            background: DefaultPalette.blueDark,
        }
    }

    const stackItemStyles: IStackItemStyles = {
        root: {
            alignItems: 'left',
            background: DefaultPalette.blueDark,
            color: DefaultPalette.white,
            height: '1.2rem',
            display: 'flex',
            justifyContent: 'left',
            fontSize: '8px'
        }
    }

    const languageMenus: IContextualMenuProps = {
        items: [
            {
                key: 'javascript',
                text: 'JavaScript',
            },
            {
                key: 'vba',
                text: 'VBA',
            },
            {
                key: 'M',
                text: 'M言語',
            },
        ],
        // By default, the menu will be focused when it opens. Uncomment the next line to prevent this.
        // shouldFocusOnMount: false
      };

    return (
        <Stack horizontal horizontalAlign="end" styles={stackStyles}>
            <Stack.Item styles={stackItemStyles}>
                <ActionButton styles={stackItemStyles}>{`フォントサイズ  :  14`}</ActionButton>
            </Stack.Item>
            <Stack.Item styles={stackItemStyles}>
                <CommandButton text={props.language} menuProps={languageMenus} styles={stackItemStyles} />
            </Stack.Item>
            <Stack.Item styles={stackItemStyles}>
                <ActionButton styles={stackItemStyles}>{`スペース  :  2`}</ActionButton>
            </Stack.Item>
            <Stack.Item styles={stackItemStyles}>
                <ActionButton styles={stackItemStyles}>{`エンコード  :  UTF-8`}</ActionButton>
            </Stack.Item>
        </Stack>
    )
}

export default Footer