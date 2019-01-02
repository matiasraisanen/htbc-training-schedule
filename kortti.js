<Card>

<CardItem header bordered>
    <Text>{this.state.day}</Text>
</CardItem>

  <CardItem>
  <Left>  
  <Text note>{treenilista.days[0].lessons[0].start} - {treenilista.days[0].lessons[0].end}</Text></Left>
    <Icon active type="FontAwesome" name="circle" style={{ color: treenilista.days[0].lessons[0].color}}/>
    <Text>{treenilista.days[0].lessons[0].name}</Text>
    
    <Right>
      <Icon name="arrow-forward" />
    </Right>
   </CardItem>

  <CardItem>
  <Left>  
  <Text note>10:30 - 11:45</Text></Left>
    <Icon active type="FontAwesome" name="circle" style={{ color: 'greenyellow'}}/>
    <Text>Alkeiskurssi II</Text>
    
    <Right>
      <Icon name="arrow-forward" />
    </Right>
   </CardItem>
 </Card>