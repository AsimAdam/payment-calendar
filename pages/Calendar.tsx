import React from "react";
import { View } from "react-native";
import { Calendar } from 'react-native-calendars';



const MyCalendar = () => {
    
  return (
    <View style={{ paddingTop: 50, flex: 1 }}>
        <Calendar

          current={'2012-03-01'}
          minDate={'2012-05-10'}
          maxDate={'2012-05-30'}
          onDayPress={day => {
            console.log('selected day', day);
          }}
          monthFormat={'yyyy MM'}
          onMonthChange={month => {
            console.log('month changed', month);
          }}
          
          hideArrows={false}
          hideExtraDays={false}
          disableMonthChange={false}
          firstDay={1}
        />
      </View>
  )
}


export default MyCalendar;