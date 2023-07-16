# cogoport-assignment-todo
In local storage either key-value pair (or) strings can be pushed, so I am converting object to string and string to object for storing and retrieving respectively ([Reference](https://stackoverflow.com/questions/2010892/how-to-store-objects-in-html5-localstorage-sessionstorage)). Since I have used a javascript object I have done as: 
<ol>
  <li> Each time I am updating the todo object I am storing it in my local storage also. (for this I am converting object to string using JSON.stringify)</li>
  <li>during the initial fetch from the API, if my local storage has some data then I am getting the data from local storage (for this I am first parsing the string using JSON.parse) else from API </li>
</ol>
