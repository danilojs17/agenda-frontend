import { FC } from 'react'
import { Portal } from '../portal/Portal'
import { GridLoader } from 'react-spinners'
import styles from './Spinner.module.scss'
import { ISpinner } from '@interface/components/spinner/Spinner'

const Spinner:FC<ISpinner> = (props) => {
  return (
    <Portal closeTime={200} portalOpen={props.open} portalTag='#spinner-portal'>
      <div className={styles.spinner_container}>
        {props.title &&
          <div className={styles.spinner_title}>
            <p style={props.titleStyle ?? {}}>Loading...</p>
          </div>
        }
        <div className={styles.spinner_content}>
          <GridLoader
            color={'blue'}
            loading
            // size={props.size ?? 200}
          />
        </div>
      </div>
    </Portal>
  )
}

export default Spinner
