import { useMutation } from '@tanstack/react-query'
import { Button, Dialog } from '@taroify/core'
import '@taroify/core/dialog/style'
import { delay } from 'es-toolkit'
import { useCallback, useState } from 'react'

const apiDelete = async () => {
  await delay(2000)
  return { code: 200, message: 'ok' }
}

export default function HomePage() {
  const [open, setOpen] = useState(false)
  const removeMutation = useMutation({ mutationFn: apiDelete })

  const onConfirm = useCallback(async () => {
    console.log('确定')

    await removeMutation.mutateAsync()
    setOpen(false)
  }, [removeMutation])

  return (
    <>
      <div>Welcome to the Milk Tea Home Page!</div>
      <Button color='primary' className='m-6' onClick={() => setOpen(true)}>
        点击我
      </Button>

      <Dialog open={open} onClose={setOpen}>
        <Dialog.Header>标题</Dialog.Header>
        <Dialog.Content>代码是写出来给人看的，附带能在机器上运行</Dialog.Content>
        <Dialog.Actions>
          <Button disabled={removeMutation.isPending} onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button loading={removeMutation.isPending} onClick={() => onConfirm()}>
            确认
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}
