$(document).ready(function () {
       var image = $('img');

       image.mapster(
       {
            fillOpacity: 0.4,
            fillColor: "d42e16",
            strokeColor: "3320FF",
            strokeOpacity: 0.8,
            strokeWidth: 4,
            stroke: true,
            isSelectable: true,
            singleSelect: true,
            mapKey: 'name',
            listKey: 'name',
            onClick: function (e) {
  
            },
            showToolTip: false,
            toolTipClose: ["tooltip-click", "area-click"],
            areas: [
                {
                    key: "violin",
                    fillColor: "ffffff"
                },
                {
                    key: "item4.5",
                    fillColor: "000000"
                },
                {
                    key: "carrots",
                    fillColor: "000000"
                },
                {
                   key: "item6",
                  //toolTip: defaultitem6Tooltip
                },
                {
                   key: "item3",
                   strokeColor: "FFFFFF"
                }
                ]
        });
      });
