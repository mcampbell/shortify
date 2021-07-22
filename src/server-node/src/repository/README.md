# `repository`

In this directory are various files to get to "bases" of data; typically a standard DB, but could
be anything.  ORM specific code is sequestered here.

Having this layer helps testing services, since calls to the db are made to THIS code and can be mocked easily,
where ORM cannot often cannot.