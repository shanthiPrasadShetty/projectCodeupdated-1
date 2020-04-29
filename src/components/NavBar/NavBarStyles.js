
export default {
  Tabs: {
    tabItemContainerStyle: {
      backgroundColor: '#000000',
    },
    inkBarStyle() {
      return {
        backgroundColor:'transparent'
      };
    },
    Tab: {
      buttonStyle: {
        paddingTop: '25px',
        display: 'inherit !important',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        alignItems: 'inherit !important',
        height: '42px',
        textAlign:'center',
      },
      style(width) {
        return {
          width: `${width - 2}%`,
          color: 'rgba(0, 0, 0, 1)',
          textTransform: 'none',
          fontSize: '15px',
          fontWeight: 500,
          padding: '0 5px',
          marginRight: '2%',
        };
      },
    },
  },
};
