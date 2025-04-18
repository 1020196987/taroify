import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import type { PropsWithChildren } from "react"
import { prefixClassname } from "../styles"

interface TimelineConnectorProps extends PropsWithChildren<ViewProps> {}

function TimelineConnector(props: TimelineConnectorProps) {
  const { className, ...restProps } = props

  return (
    <View className={classNames(prefixClassname("timeline-connector"), className)} {...restProps} />
  )
}

export default TimelineConnector
