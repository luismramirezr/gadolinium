/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useRouter } from 'next/router';

import {
  Typography as MUITypography,
  TypographyProps,
  Button,
} from '@material-ui/core';

import { t } from 'utils/i18n';

import useStyles from './styles';

interface Props extends TypographyProps {
  text?: string;
  values?: { [key: string]: string };
  href?: string;
  component?: string;
}

const Typography: React.FC<Props> = ({
  text,
  children,
  values,
  href,
  ...props
}) => {
  const classes = useStyles();
  const { push } = useRouter();
  const handleClick = () => push(href || '');
  if (href) {
    if (href.startsWith('/'))
      return (
        <MUITypography {...props}>
          <Button className={classes.link} onClick={handleClick}>
            {!!text && t(text, values)}
            {children}
          </Button>
        </MUITypography>
      );
    return (
      <MUITypography {...props}>
        <Button className={classes.link} href={href}>
          {!!text && t(text, values)}
          {children}
        </Button>
      </MUITypography>
    );
  }

  return (
    <MUITypography {...props}>
      {!!text && t(text, values)}
      {children}
    </MUITypography>
  );
};

export const withPrefix = (prefix: string) => (props: Props) => (
  <Typography
    {...props}
    // eslint-disable-next-line react/destructuring-assignment
    text={props.text ? `${prefix}.${props.text}` : undefined}
  />
);

export default Typography;
