# Developing Sections

## Creating a new Section

TODO: How To Create Component in sections/NAME.tsx

## Implement the new Section

To create a new section the following modifications to existing files need to be made:

### Add the _Custom Type_ (`page_dynamic.json`)

Add a new definiton to `custom_types/page_dynamic.json`. You can use the Prismic Type Editor to create the type and copy over the JSON.

The full JSON will look something like this:

```json
{
  //...
  "Main": {
    "body": {
      //...
      "config": {
        //...
        "choices": {
          "YOUR_SECTION_ID": {
            "type": "Slice",
            //...
            "non-repeat": {
              //...
            },
            "repeat": {
              //...
            }
          }
        }
      }
    }
  }
}
```

### Add your Section to the _typeMap_ (`sections/index.tsx`)

Add your Section to `src/sections/index.tsx`. Around L16 you should find a `Record` called `sliceTypeMap`, this is where you need to append your Section.
To do this, grab the key from the previous step (_Custom Type_ definition) and provide your component as the value, something like this:

```typescript
export const sliceTypeMap: Record<string, SliceComponent<any>> = {
  text: Text,
  //...
  YOUR_SECTION_ID: YourSectionComponent,
}
```

### Add the GraphQL query on the dynamic page (`pages/{PrismicPageDynamic.url}.tsx`)

Add the name of your GraphQL query to the dynamic page in `src/pages/{PrismicPageDynamic.url}.tsx`.

If your Section component GraphQL query looks something like this:

you will need to append `...PageDynamicBodyYourSectionComponent` to the query inside `prismicPageDynamic.data.body` which should look something like this:

```
query DynamicPageQuery($id: String) {
    site {
        [...]
    }
    prismicPageDynamic(id: { eq: $id }) {
        _previewable
        data {
            body {
                ... on PrismicSliceType {
                    slice_type
                }
                ...PageDynamicDataBodyText
                [...]
                ...PageDynamicBodyYourSectionComponent
            }
        }
    }
    ...Theme
}
```
