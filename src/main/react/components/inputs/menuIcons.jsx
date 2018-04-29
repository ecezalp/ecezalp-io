import React from 'react';
import IconButton from 'material-ui/IconButton';
import {Link} from 'react-router-dom';

export default function MenuIcons({entries}) {
  const styles = {
    smallIcon: {
      width: 36,
      height: 36,
    },
    small: {
      width: 72,
      height: 72,
      padding: 16,
    },
  };

  const icons = [
    {className: "fas rectangle", to: `/archive/${entries.length > 0 && entries[0].id}`},
    {className: "fas fa-th-large", to: "/blog"},
    {className: "fas fa-th", to: "/archive"},
    {className: "fas fa-thumbtack", to: "/author"},
    {className: "fas fa-cloud-upload-alt", to:"/entries/new"}
  ];

  return <div className="icon-container">
    {icons.map((icon, index) =>
      <Link className="eio-link" to={icon.to} key={`icon-${index}`}>
        <IconButton iconStyle={styles.smallIcon}
                    style={styles.small}
                    iconClassName={icon.className}/>
      </Link>)}
  </div>
};