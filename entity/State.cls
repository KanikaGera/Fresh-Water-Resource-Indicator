/// Objects of the class are the satates of India
Class entity.State Extends (%Persistent, %Populate, %XML.Adaptor) [ StorageStrategy = "" ]
{

Property name As %String(CAPTION = "My Caption");

ClassMethod setStateName(stateName As %String) As %Status
{
	//set state = ##class(domain.State).%New()
 	//set state.name = stateName
 	//write !,state.name
 	set statement = ##class(%SQL.Statement).%New()
 	set query = "INSERT INTO domain.State(Name) VALUES('"_stateName_"');"
 	set status = statement.%Prepare(.query)
 	IF status'=1 {WRITE "%Prepare failed:" DO $System.Status.DisplayError(status) }
 	set status2 = statement.%Execute()
 	write !,status2
}

}