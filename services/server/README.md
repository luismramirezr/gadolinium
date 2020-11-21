# Server

## Entitity Chart
### Main Table
| Entity     | PK                              | SK                              |
|------------|---------------------------------|---------------------------------|
| Customers  | `CUSTOMER#<email>`              | `CUSTOMER#<email>`              |
| Addresses  | N/A                             | N/A                             |
| Orders     | `CUSTOMER#<email>`              | `#ORDER#<orderId>`              |
| OrderItems | `ORDER#<orderId>#ITEM#<itemId>` | `ORDER#<orderId>#ITEM#<itemId>` |
### GSI1
| Entity     | GSI1PK                        | GSI1SK                        |
|------------|-------------------------------|-------------------------------|
| Customers  |                               |                               |
| Addresses  |                               |                               |
| Orders     | `ORDER#<orderId>`             | `ORDER#<orderId>`             |
| OrderItems | `ORDER#<orderId>`             | `ITEM#<itemId>`               |

## Access Patterns
| Access Pattern                     | Index      | Parameters | Notes                                                                       |
|------------------------------------|------------|------------|-----------------------------------------------------------------------------|
| Create Customer                    | N/A        | N/A        |                                                                             |
| Create / Update Address            | N/A        | N/A        | Use `UpdateItem` to update the `Addresses` attribute on the `Customer` item |
| View Customer & Most Recent Orders | Main Table | `email`    | Use `ScanIndexForward=False` to fetch in descending order                   |
| Save Order                         | N/A        | N/A        | Use `TransactWriteItems` to create `Order` and `OrderItems` in one request  |
| Update Order                       | N/A        | N/A        | Use `UpdateItem` to update the status of an `Order`                         |
| View Order & Order Items           | GSI1       | `orderId`  |                                                                             |