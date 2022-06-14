import styled from 'styled-components'

const TableStyles = styled.div`
  & {
    border: 3px solid #000;
    overflow-x: auto;
    width: auto;

    & * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    & [data-testid='cell'],
    & [data-testid='action-cell'] {
      border: 1px solid rgba(0, 0, 0, 0.02);
    }

    & [data-testid='thead-col-sort-icons'] {
      opacity: 0.3;
    }

    & [data-testid='thead-col-sort-icon-default'] {
      position: relative;
    }

    & [data-testid='thead-col-sort-icon-default'] i {
      position: absolute;
    }

    & [data-testid='thead-col-sort-icon-default'] i:first-child {
      transform: scale(0.7) translateY(40%);
    }

    & [data-testid='thead-col-sort-icon-default'] i:last-child {
      transform: scale(0.7) translateY(-20%);
    }

    & [data-testid='thead'] [data-testid='cell'] {
      cursor: pointer;
      user-select: none;
    }

    /*Should not be overridden by customStyle*/
    [data-testid='thead-col-sort-icons'] [data-testid='thead-col-sort-text'] {
      visibility: hidden !important;
    }
    & [data-testid='row'] {
      display: grid !important;
    }
  }
`

export default TableStyles
