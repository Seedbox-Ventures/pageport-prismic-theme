import React from 'react'

export interface DataComponent<P, D> extends React.FC<P> {
  mapDataToProps: (data: D) => P
}
