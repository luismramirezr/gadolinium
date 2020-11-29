/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import MUIButton, { ButtonProps } from '@material-ui/core/Button';
import { Box, CircularProgress } from '@material-ui/core';

import { t } from 'utils/i18n';
import { useRouter } from 'next/router';

export interface Props extends ButtonProps {
  isFetching?: boolean;
  text?: string;
}

const Button: React.FC<Props> = ({
  children,
  isFetching,
  text,
  href,
  ...props
}) => {
  const { push } = useRouter();
  const onClick = React.useMemo(() => {
    if (href && !href.startsWith('http')) {
      return () => push(href);
    }
    return undefined;
  }, [href]);

  if (isFetching)
    return (
      <MUIButton
        {...props}
        href={!href?.startsWith('http') ? undefined : href}
        disabled
      >
        {text && t(text)}
        {children}
        <Box
          position="absolute"
          height="100%"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="primary" size={24} />
        </Box>
      </MUIButton>
    );

  return (
    <MUIButton
      {...props}
      href={!href?.startsWith('http') ? undefined : href}
      onClick={props.onClick ? props.onClick : onClick}
    >
      {text && t(text)}
      {children}
    </MUIButton>
  );
};

Button.defaultProps = {
  isFetching: false,
};

export default Button;
