import { CheckCircle2, Plus } from 'lucide-react'
import { DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import logo from '../assets/orbit-sm.svg'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { OutlineButton } from './ui/outline-button'
const style = { width: 200 }
const completedPercent = 58

export function Summary() {
  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span>
            <img src={logo} alt="" />
          </span>
          <span className="text-lg font-semibold">5 a 10 de agosto</span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>
      <div className=" flex flex-col gap-3">
        <Progress value={14} max={15}>
          <ProgressIndicator style={style} />
        </Progress>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou <span className="text-zinc-100">x</span> de{' '}
            <span className="text-zinc-100">u</span> nessa semana
          </span>
          <span> {completedPercent}% </span>
        </div>
      </div>
      <Separator />

      <div className=" flex flex-wrap gap-3">
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          Meditar
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          Treinar
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          Nada
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          Orar
        </OutlineButton>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium"> Sua semana</h2>

        <div className="flex flex-col gap-4">
          <h3 className="font-medium">
            Domingo{' '}
            <span className="text-zinc-400 text-xs">(10 de agosto)</span>
          </h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className='text-sm text-zinc-400'> Você completou  <span className='text-zinc-100'> "Acordar cedo"</span> ás  <span className='text-zinc-100'> 08:13h</span> </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className='text-sm text-zinc-400'> Você completou  <span className='text-zinc-100'> "Nadar"</span> ás  <span className='text-zinc-100'> 13:27h</span> </span>
            </li>
          </ul>
          <h3 className="font-medium">
            Segunda{' '}
            <span className="text-zinc-400 text-xs">(11 de agosto)</span>
          </h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className='text-sm text-zinc-400'> Você completou  <span className='text-zinc-100'> "Acordar cedo"</span> ás  <span className='text-zinc-100'> 08:13h</span> </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className='text-sm text-zinc-400'> Você completou  <span className='text-zinc-100'> "Nadar"</span> ás  <span className='text-zinc-100'> 13:27h</span> </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
