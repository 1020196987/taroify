import { View } from "@tarojs/components"
import type { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useContext,
  useMemo,
} from "react"
import Input from "../input"
import { prefixClassname } from "../styles"
import { doFormControlHandler } from "./control"
import FormItemContext from "./form-item.context"
import FormContext from "./form.context"
import type { FormControlAlign, FormController } from "./form.shared"

interface FormControlProps<V> extends Omit<ViewProps, "children">, FormController<V> {
  align?: FormControlAlign
  children?: ReactNode | ((controller: FormController<V>) => ReactNode)
}

function FormControl<V = any>(props: FormControlProps<V>) {
  const {
    className,
    name,
    value,
    disabled,
    align: alignProp,
    children = <Input />,
    onChange: onDelegatingChange,
    onBlur: onDelegatingBlur,
    ...restProps
  } = props
  const { name: formName, controlAlign } = useContext(FormContext)
  const align = alignProp ?? controlAlign

  const { validateStatus } = useContext(FormItemContext)

  const field = useMemo<ReactNode>(() => {
    if (_.isFunction(children)) {
      return children?.({
        name,
        value: formName ? value : undefined,
        validateStatus,
        disabled,
        onChange: onDelegatingChange,
        onBlur: onDelegatingBlur,
      })
    }

    return Children.map(children, (child: ReactNode) => {
      if (!isValidElement(child)) {
        return child
      }
      const element = child as ReactElement
      return doFormControlHandler(element, {
        name,
        value,
        validateStatus,
        disabled,
        onChange: onDelegatingChange,
        onBlur: onDelegatingBlur,
      })
    })
  }, [
    children,
    formName,
    name,
    onDelegatingBlur,
    onDelegatingChange,
    validateStatus,
    disabled,
    value,
  ]) as JSX.Element

  return (
    <View
      className={classNames(
        prefixClassname("form-control"),
        {
          [prefixClassname("form-control--left")]: align === "left",
          [prefixClassname("form-control--center")]: align === "center",
          [prefixClassname("form-control--right")]: align === "right",
        },
        className,
      )}
      children={field}
      {...restProps}
    />
  )
}

export default FormControl
