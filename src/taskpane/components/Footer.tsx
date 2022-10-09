import * as React from "react";
import { DefaultPalette, Stack, IStackStyles, IStackItemStyles } from '@fluentui/react'
import { ActionButton } from '@fluentui/react/lib/Button'
import type { MonacoProps } from './App'

export interface Props {
	monacoProps: MonacoProps
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

	return (
		<Stack horizontal horizontalAlign="end" styles={stackStyles}>
			<Stack.Item styles={stackItemStyles}>
				<ActionButton styles={stackItemStyles}>{`${props.monacoProps.language}`}</ActionButton>
			</Stack.Item>
			<Stack.Item styles={stackItemStyles}>
				<ActionButton styles={stackItemStyles}>{`フォントサイズ  :  ${props.monacoProps.options.fontSize}`}</ActionButton>
			</Stack.Item>
			<Stack.Item styles={stackItemStyles}>
				<ActionButton styles={stackItemStyles}>{`スペース  :  2`}</ActionButton>
			</Stack.Item>
			<Stack.Item styles={stackItemStyles}>
				<ActionButton styles={stackItemStyles}>{`UTF-8`}</ActionButton>
			</Stack.Item>
		</Stack>
	)
}

export default Footer